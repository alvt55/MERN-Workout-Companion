
import { defineConfig, createSystem } from "@chakra-ui/react"
const config = defineConfig({
    globalCss: {
      "body": {
        color: "blue"
      },
    },
  })
  
  export default createSystem(config)