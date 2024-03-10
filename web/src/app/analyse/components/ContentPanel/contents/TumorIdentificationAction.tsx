import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React from "react";

export default function TumorIdentificationAction() {
  return (
    <section>
      <h1>Tumor Identification</h1>
      <p>
        Our ML model will attempt to identify if there is a lower-grade glioma
        in the given scan.
      </p>
      <PrimaryButton>IDENTIFY TUMOR</PrimaryButton>
      <p>
        Please keep in mind that AI-enhanced images should be given appropriate
        review.
      </p>
    </section>
  );
}
