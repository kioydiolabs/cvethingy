"use client";

import { Card } from "@/components/ui/card";

type DecodedVectorString = {
  version: string;
  attack_vector: string;
  attack_complexity: string;
  privileges_required: string;
  user_interaction: string;
  scope: string;
  confidentiality: string;
  integrity: string;
  availability: string;
};

const decodeVectorString = (
  vector: string | undefined,
): DecodedVectorString | null => {
  if (!vector) {
    return null;
  } else {
    const segments = vector.split("/");

    const metrics: { [key: string]: string } = {};

    segments.forEach((segment) => {
      const [metric, value] = segment.split(":");
      metrics[metric] = value;
    });

    const accessVector: { [key: string]: string } = {
      L: "Local",
      A: "Adjacent Network",
      N: "Network",
      P: "Physical",
    };

    const attackComplexity: { [key: string]: string } = {
      H: "High",
      M: "Medium",
      L: "Low",
    };

    const privilegesRequired: { [key: string]: string } = {
      M: "Multiple",
      S: "Single",
      N: "None",
      L: "Low",
      H: "High",
    };

    const userInteraction: { [key: string]: string } = {
      N: "None",
      R: "Required",
    };

    const scope: { [key: string]: string } = {
      C: "Changed",
      U: "Unchanged",
    };

    const confidentialityImpact: { [key: string]: string } = {
      N: "None",
      L: "Low",
      H: "High",
    };

    const integrityImpact: { [key: string]: string } = {
      N: "None",
      L: "Low",
      H: "High",
    };

    const availabilityImpact: { [key: string]: string } = {
      N: "None",
      L: "Low",
      H: "High",
    };

    return {
      version: metrics["CVSS"],
      attack_vector: accessVector[metrics["AV"]],
      attack_complexity: attackComplexity[metrics["AC"]],
      privileges_required: privilegesRequired[metrics["PR"]],
      user_interaction: userInteraction[metrics["UI"]],
      scope: scope[metrics["S"]],
      confidentiality: confidentialityImpact[metrics["C"]],
      integrity: integrityImpact[metrics["I"]],
      availability: availabilityImpact[metrics["A"]],
    };
  }
};

const VectorData = (props: { vector_string: string | undefined }) => {
  const DecodedData: DecodedVectorString | null = decodeVectorString(
    props.vector_string,
  );

  if (!DecodedData) {
    return null;
  } else {
    console.log(DecodedData);

    return (
      <Card className="flex flex-col items-start justify-center gap-0 p-4 w-min">
        <li>
          Version: <strong>{DecodedData.version}</strong>
        </li>
        <li>
          Attack Vector: <strong>{DecodedData.attack_vector}</strong>
        </li>
        <li>
          Attack Complexity: <strong>{DecodedData.attack_complexity}</strong>
        </li>
        <li>
          Privileges Required:{" "}
          <strong>{DecodedData.privileges_required}</strong>
        </li>
        <li>
          User Interaction: <strong>{DecodedData.user_interaction}</strong>
        </li>
        <li>
          Scope: <strong>{DecodedData.scope}</strong>
        </li>
        <li>
          Confidentiality Impact: <strong>{DecodedData.confidentiality}</strong>
        </li>
        <li>
          Integrity Impact: <strong>{DecodedData.integrity}</strong>
        </li>
        <li>
          Availability Impact: <strong>{DecodedData.availability}</strong>
        </li>
      </Card>
    );
  }
};

export default VectorData;
