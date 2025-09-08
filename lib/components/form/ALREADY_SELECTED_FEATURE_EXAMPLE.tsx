/**
 * Example usage of FieldsetSelect and FieldsetAsyncSelect with "already selected" functionality
 *
 * This feature allows you to mark certain options as already selected in other contexts,
 * preventing them from being selected again and showing them with a disabled state.
 */

import React from "react";
import { Fieldset } from "#/components/form/components/fieldset/Fieldset";
import { createFieldsetSelectOptionWithSelectedState } from "#/components/form/components/fieldset/FieldsetSelectOptionWithSelectedState";
import { FieldsetSelectOption } from "#/components/form/model";

const territoryOptions: FieldsetSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const alreadySelectedTerritories: FieldsetSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

export function FieldsetSelectExampleWithAlreadySelected() {
  const [selectedTerritory, setSelectedTerritory] =
    React.useState<FieldsetSelectOption | null>(null);

  return (
    <div className="space-y-4">
      {/* Basic usage with already selected values */}
      <Fieldset>
        <Fieldset.Label>Territory Selection</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select a territory"
          options={territoryOptions}
          value={selectedTerritory}
          onChange={setSelectedTerritory}
          alreadySelectedValues={alreadySelectedTerritories}
          showAlreadySelectedText={true}
          alreadySelectedText="(Already selected)"
        />
      </Fieldset>

      {/* Async select with already selected values */}
      <Fieldset>
        <Fieldset.Label>Async Territory Selection</Fieldset.Label>
        <Fieldset.AsyncSelect
          placeholder="Search territories"
          defaultOptions={territoryOptions}
          value={selectedTerritory}
          onChange={setSelectedTerritory}
          alreadySelectedValues={alreadySelectedTerritories}
          loadOptions={async (inputValue) => {
            // Simulate API call
            return territoryOptions.filter((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase()),
            );
          }}
        />
      </Fieldset>

      {/* Custom option component usage */}
      <Fieldset>
        <Fieldset.Label>Custom Option Component</Fieldset.Label>
        <Fieldset.Select
          placeholder="Select with custom component"
          options={territoryOptions}
          value={selectedTerritory}
          onChange={setSelectedTerritory}
          selectComponentOptions={{
            Option: createFieldsetSelectOptionWithSelectedState({
              alreadySelectedValues: alreadySelectedTerritories,
              currentValue: selectedTerritory,
              showAlreadySelectedText: true,
              alreadySelectedText: "(Used in another territory)",
            }),
          }}
        />
      </Fieldset>
    </div>
  );
}

/**
 * Props explanation:
 *
 * alreadySelectedValues: Array of FieldsetSelectOption[] - Options that should be marked as already selected
 * showAlreadySelectedText: boolean (default: true) - Whether to show the "(Already selected)" text
 * alreadySelectedText: string (default: "(Already selected)") - Custom text to show for already selected options
 *
 * When an option is marked as already selected:
 * - It appears with disabled styling (grayed out, reduced opacity)
 * - It shows the "already selected" text next to the label
 * - Clicking on it is prevented (won't select the option)
 * - It's not marked as already selected if it's the current value
 */
