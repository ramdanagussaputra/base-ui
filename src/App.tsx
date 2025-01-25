import { BigText, Button } from "massive-base-ui";

function App() {
  return (
    <main>
      <Button onClick={() => console.log("Button clicked")}>Button</Button>

      <BigText>BigText</BigText>
    </main>
  );
}

export default App;
