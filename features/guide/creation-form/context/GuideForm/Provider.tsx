import { GuideMetaDataProvider } from "../GuideMetaData/Provider";
import { GuideBiblicalReferencesListsProvider } from "../GuideBiblicalReferencesLists/Provider";
import { GuideSectionProvider } from "../GuideSection/Provider";

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