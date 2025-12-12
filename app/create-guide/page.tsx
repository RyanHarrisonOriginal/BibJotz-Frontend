'use client';

import { CreateGuideProvider } from '@/features/guide/creation-form/context/CreateGuideProvider';
import CreateGuidePage from '../../features/guide/creation-form/CreateGuidePage';

export default function CreateGuide() {

  return (
    <CreateGuideProvider>
      <CreateGuidePage />
    </CreateGuideProvider>
  );
}

