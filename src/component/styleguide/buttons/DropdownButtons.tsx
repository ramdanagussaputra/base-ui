import { Button } from "#/components/button/Button";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";

function DropdownButtons() {
  return (
    <div className="space-y-6">
      <StyleguideSubtitle>Dropdown Buttons</StyleguideSubtitle>
      
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <Button.Dropdown buttonText="Download" variant="solid" color="primary">
            <Button.Dropdown.Item onClick={() => console.log("Download as CSV")}>
              Download as CSV
            </Button.Dropdown.Item>
            <Button.Dropdown.Item onClick={() => console.log("Download as XLSX")}>
              Download as XLSX
            </Button.Dropdown.Item>
            <Button.Dropdown.Item onClick={() => console.log("Download as PDF")}>
              Download as PDF
            </Button.Dropdown.Item>
          </Button.Dropdown>

          <Button.Dropdown buttonText="Actions" variant="outline" color="secondary">
            <Button.Dropdown.Item onClick={() => console.log("Edit")}>
              Edit
            </Button.Dropdown.Item>
            <Button.Dropdown.Item onClick={() => console.log("Duplicate")}>
              Duplicate
            </Button.Dropdown.Item>
            <Button.Dropdown.Item onClick={() => console.log("Delete")}>
              Delete
            </Button.Dropdown.Item>
          </Button.Dropdown>

          <Button.Dropdown buttonText="Export" variant="light" color="primary" anchor="top end">
            <Button.Dropdown.Item onClick={() => console.log("Export to CSV")}>
              Export to CSV
            </Button.Dropdown.Item>
            <Button.Dropdown.Item onClick={() => console.log("Export to JSON")}>
              Export to JSON
            </Button.Dropdown.Item>
          </Button.Dropdown>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button.Dropdown buttonText="Small" size="small" variant="solid" color="primary">
            <Button.Dropdown.Item onClick={() => console.log("Option 1")}>
              Option 1
            </Button.Dropdown.Item>
            <Button.Dropdown.Item onClick={() => console.log("Option 2")}>
              Option 2
            </Button.Dropdown.Item>
          </Button.Dropdown>

          <Button.Dropdown buttonText="Large" size="large" variant="solid" color="secondary">
            <Button.Dropdown.Item onClick={() => console.log("Large Option 1")}>
              Large Option 1
            </Button.Dropdown.Item>
            <Button.Dropdown.Item onClick={() => console.log("Large Option 2")}>
              Large Option 2
            </Button.Dropdown.Item>
          </Button.Dropdown>

          <Button.Dropdown 
            buttonText="Loading..." 
            variant="solid" 
            color="primary" 
            isLoading={true}
          >
            <Button.Dropdown.Item onClick={() => console.log("Option 1")}>
              Option 1
            </Button.Dropdown.Item>
          </Button.Dropdown>

          <Button.Dropdown 
            buttonText="Disabled" 
            variant="solid" 
            color="primary" 
            isDisabled={true}
          >
            <Button.Dropdown.Item onClick={() => console.log("Option 1")}>
              Option 1
            </Button.Dropdown.Item>
          </Button.Dropdown>
        </div>

        <div className="mt-8">
          <h4 className="text-b3-500 mb-4 font-medium">Anchor Positions Demo</h4>
          <div className="flex flex-wrap items-center justify-center gap-8 p-8 bg-neutral-50 rounded-lg">
            <Button.Dropdown buttonText="Top Start" anchor="top start" variant="outline">
              <Button.Dropdown.Item>Option 1</Button.Dropdown.Item>
              <Button.Dropdown.Item>Option 2</Button.Dropdown.Item>
            </Button.Dropdown>

            <Button.Dropdown buttonText="Top End" anchor="top end" variant="outline">
              <Button.Dropdown.Item>Option 1</Button.Dropdown.Item>
              <Button.Dropdown.Item>Option 2</Button.Dropdown.Item>
            </Button.Dropdown>

            <Button.Dropdown buttonText="Bottom Start" anchor="bottom start" variant="outline">
              <Button.Dropdown.Item>Option 1</Button.Dropdown.Item>
              <Button.Dropdown.Item>Option 2</Button.Dropdown.Item>
            </Button.Dropdown>

            <Button.Dropdown buttonText="Bottom End" anchor="bottom end" variant="outline">
              <Button.Dropdown.Item>Option 1</Button.Dropdown.Item>
              <Button.Dropdown.Item>Option 2</Button.Dropdown.Item>
            </Button.Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownButtons;