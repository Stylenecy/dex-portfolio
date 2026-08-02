import { profile } from '@/data/profile';

export default function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="shell ftr__in">
        <p>© {new Date().getFullYear()} Dex Bennett · Yogyakarta</p>
        <p className="ftr__note">
          Every claim on this site was checked against source documents on {profile.verifiedOn}.
        </p>
      </div>
    </footer>
  );
}
