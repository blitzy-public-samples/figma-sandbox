import DeviceFrame from '@/components/layout/DeviceFrame';
import TopCard from '@/components/discover/TopCard';

export default function DiscoverPage() {
  return (
    <DeviceFrame>
      <div style={{ paddingTop: 100 }}>
        <TopCard />
      </div>
    </DeviceFrame>
  );
}
