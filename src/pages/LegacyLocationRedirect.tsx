import { useParams } from 'react-router-dom';
import LegacyUrlHandler from '../components/LegacyUrlHandler';

const LegacyLocationRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    // Use the LegacyUrlHandler for the current path
    return <LegacyUrlHandler />;
  }
  
  // Use the LegacyUrlHandler for legacy URLs with slugs
  return <LegacyUrlHandler />;
};

export default LegacyLocationRedirect;