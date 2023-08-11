import { ChakraProvider } from "@chakra-ui/react";
import RegisterationForm from "./RegisterationForm";


function App() {
  return (
   <ChakraProvider>

     <RegisterationForm/>
   </ChakraProvider>
    
  );
}

export default App;
