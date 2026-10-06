import { profile } from '@/data/profile';
import MotionToggle from './MotionToggle';

export default function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="shell ftr__in">
        <p>© {new Date().getFullYear()} Dex Bennett · {profile.location}</p>
        <p className="ftr__note">Every claim here was checked against source documents on {profile.verifiedOn}.</p>
        <MotionToggle />
      </div>
    </footer>
  );
}
