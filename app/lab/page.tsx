import { PageIntro } from "@/components/ui";
import {
  OrbitalExperiment,
  ArchitectureExperiment,
  InterfaceExperiment,
} from "@/components/lab-experiments";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Lab",
  "Three interactive engineering experiments: orbital systems, architecture, and interface design.",
  "/lab",
);
export default function LabPage() {
  return (
    <>
      <PageIntro
        cosmos="lab"
        index="04"
        eyebrow="An engineering bench / 03 experiments"
        title={
          <>
            Small experiments.
            <br />
            <span>Useful ideas.</span>
          </>
        }
      >
        A space to explore form, follow a request, and feel how interface
        decisions change an experience.
      </PageIntro>
      <div className="container">
        <p className="lab-intro-note">
          All experiments run locally in your browser. No account or external
          service required.
        </p>
        <OrbitalExperiment />
        <ArchitectureExperiment />
        <InterfaceExperiment />
      </div>
    </>
  );
}
