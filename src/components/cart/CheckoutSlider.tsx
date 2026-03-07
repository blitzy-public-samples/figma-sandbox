'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Props interface for the CheckoutSlider component.
 * @property onCheckout - Callback invoked when the user successfully drags
 *   the handle past the checkout threshold (~80% of the track width).
 */
export interface CheckoutSliderProps {
  /** Callback triggered when the slide gesture completes past the threshold */
  onCheckout: () => void;
}

/* ── Layout constants (px) matching Figma node 1:233 ── */
const TRACK_WIDTH = 174;
const HANDLE_SIZE = 44;
const MAX_DRAG = TRACK_WIDTH - HANDLE_SIZE; // 130px maximum drag distance
const CHECKOUT_THRESHOLD = 0.8; // Trigger checkout at 80% drag

/**
 * CheckoutSlider — slide-to-checkout control.
 *
 * Renders a 174×44 dark recessed track with centered "Checkout" text and a
 * 44×44 gradient draggable handle positioned at the right end. The user drags
 * the handle to the left; when it crosses ~80 % of the track the `onCheckout`
 * callback fires. Releasing before the threshold snaps the handle back with a
 * 300 ms ease-out transition.
 *
 * Supports both mouse (desktop) and touch (mobile) drag gestures.
 *
 * Figma reference: node 1:233, Shopping Bag screen.
 */
export default function CheckoutSlider({ onCheckout }: CheckoutSliderProps) {
  /* ── State ── */
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Ref mirrors the latest dragOffset so the window-level event listeners
   * (attached once per gesture) always read the current value instead of a
   * stale closure capture.
   */
  const dragOffsetRef = useRef(0);

  /**
   * Ref stores references to active window-level listeners so they can be
   * cleaned up on component unmount — prevents listener leaks if the user
   * navigates away mid-drag.
   */
  const activeListenersRef = useRef<{
    mousemove?: (e: MouseEvent) => void;
    mouseup?: () => void;
    touchmove?: (e: TouchEvent) => void;
    touchend?: () => void;
  }>({});

  /** Keep dragOffset ref in sync with state */
  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

  /** Cleanup: remove any active window listeners on component unmount */
  useEffect(() => {
    const listenersRef = activeListenersRef;
    return () => {
      const listeners = listenersRef.current;
      if (listeners.mousemove) window.removeEventListener('mousemove', listeners.mousemove);
      if (listeners.mouseup) window.removeEventListener('mouseup', listeners.mouseup);
      if (listeners.touchmove) window.removeEventListener('touchmove', listeners.touchmove);
      if (listeners.touchend) window.removeEventListener('touchend', listeners.touchend);
    };
  }, []);

  /**
   * Computed left-position of the handle.
   * Default (no drag): handle sits at MAX_DRAG (right end).
   * As the user drags left, dragOffset increases and handlePosition decreases.
   */
  const handlePosition = Math.max(
    0,
    Math.min(MAX_DRAG, MAX_DRAG - dragOffset),
  );

  /* ── Mouse drag handlers (desktop) ── */
  const handleMouseDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const startX = e.clientX;
      dragOffsetRef.current = 0;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const delta = startX - moveEvent.clientX;
        const clamped = Math.max(0, Math.min(MAX_DRAG, delta));
        dragOffsetRef.current = clamped;
        setDragOffset(clamped);
      };

      const onMouseUp = () => {
        setIsDragging(false);
        if (dragOffsetRef.current > MAX_DRAG * CHECKOUT_THRESHOLD) {
          onCheckout();
        }
        setDragOffset(0);
        dragOffsetRef.current = 0;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        activeListenersRef.current.mousemove = undefined;
        activeListenersRef.current.mouseup = undefined;
      };

      /* Store listener references for unmount cleanup */
      activeListenersRef.current.mousemove = onMouseMove;
      activeListenersRef.current.mouseup = onMouseUp;

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [onCheckout],
  );

  /* ── Touch drag handlers (mobile) ── */
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      setIsDragging(true);
      const startX = touch.clientX;
      dragOffsetRef.current = 0;

      const onTouchMove = (moveEvent: TouchEvent) => {
        const currentTouch = moveEvent.touches[0];
        if (!currentTouch) return;
        const delta = startX - currentTouch.clientX;
        const clamped = Math.max(0, Math.min(MAX_DRAG, delta));
        dragOffsetRef.current = clamped;
        setDragOffset(clamped);
      };

      const onTouchEnd = () => {
        setIsDragging(false);
        if (dragOffsetRef.current > MAX_DRAG * CHECKOUT_THRESHOLD) {
          onCheckout();
        }
        setDragOffset(0);
        dragOffsetRef.current = 0;
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        activeListenersRef.current.touchmove = undefined;
        activeListenersRef.current.touchend = undefined;
      };

      /* Store listener references for unmount cleanup */
      activeListenersRef.current.touchmove = onTouchMove;
      activeListenersRef.current.touchend = onTouchEnd;

      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    },
    [onCheckout],
  );

  /* ── Keyboard support (progressive enhancement) ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCheckout();
      }
    },
    [onCheckout],
  );

  return (
    <div
      ref={trackRef}
      className="relative w-[174px] h-[44px] rounded-button flex items-center overflow-hidden mx-auto shadow-checkout-inset"
      role="slider"
      aria-label="Slide to checkout"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round((dragOffset / MAX_DRAG) * 100)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* ── "Checkout" label centred in the track ── */}
      <span
        className="absolute inset-0 flex items-center justify-center font-medium text-[15px] leading-[1.5em] tracking-[-0.02em] pointer-events-none select-none text-text-muted"
      >
        Checkout
      </span>

      {/* ── Draggable gradient handle ── */}
      <div
        className="absolute top-0 w-[44px] h-[44px] rounded-button flex items-center justify-center text-white cursor-grab active:cursor-grabbing z-10 touch-none bg-gradient-primary"
        style={{
          left: `${handlePosition}px`,
          /* Spring-back: animate only when not actively dragging */
          transition: isDragging ? 'none' : 'left 0.3s ease-out',
        }}
        onMouseDown={handleMouseDragStart}
        onTouchStart={handleTouchStart}
        aria-hidden="true"
      >
        {/* Chevron-right inline SVG (matches Figma node 1:236) */}
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9,6 15,12 9,18" />
        </svg>
      </div>
    </div>
  );
}
