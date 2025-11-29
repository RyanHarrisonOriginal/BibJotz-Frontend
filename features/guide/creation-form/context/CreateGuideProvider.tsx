import { GuideMetaDataProvider } from "./GuideMetaDataProvider";
import { GuideBiblicalReferencesListsProvider } from "./GuideBiblicalReferencesListsProvider";
import { GuideSectionProvider } from "./GuideSectionProvider";

export function CreateGuideProvider({ children }: { children: React.ReactNode }) {
    return (
        <GuideMetaDataProvider>
            <GuideBiblicalReferencesListsProvider>
                <GuideSectionProvider>
                    {children}
                </GuideSectionProvider>
            </GuideBiblicalReferencesListsProvider>
        </GuideMetaDataProvider>
    )
}