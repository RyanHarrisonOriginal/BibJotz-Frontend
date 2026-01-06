'use client';

import { CreateGuideProvider } from '@/domain/guide/context/GuideForm/Provider';
import CreateGuidePage from '@/screens/CreateGuideScreen';

export default function CreateGuide() {

  return (
    <CreateGuideProvider>
      <CreateGuidePage />
    </CreateGuideProvider>
  );
}

