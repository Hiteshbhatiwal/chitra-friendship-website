import { ProtectedGate } from './components/auth/ProtectedGate';
import { ScrapbookExperience } from './components/scrapbook/ScrapbookExperience';

export function App() {
  return (
    <ProtectedGate>
      <ScrapbookExperience />
    </ProtectedGate>
  );
}

export default App;
