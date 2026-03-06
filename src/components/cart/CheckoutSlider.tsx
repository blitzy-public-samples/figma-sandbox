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

  /** Keep ref in sync with state */
  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

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
      };

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
      };

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
      className="relative w-[174px] h-[44px] rounded-[10px] flex items-center overflow-hidden mx-auto"
      style={{
        boxShadow:
          'inset 4px 4px 30px rgba(17,22,30,1), inset -2px -2px 8px rgba(43,53,69,1)',
      }}
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
        className="absolute inset-0 flex items-center justify-center font-medium text-[15px] leading-[1.5em] tracking-[-0.02em] pointer-events-none select-none"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        Checkout
      </span>

      {/* ── Draggable gradient handle ── */}
      <div
        className="absolute top-0 w-[44px] h-[44px] rounded-[10px] flex items-center justify-center text-white cursor-grab active:cursor-grabbing z-10 touch-none"
        style={{
          background: 'linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%)',
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
