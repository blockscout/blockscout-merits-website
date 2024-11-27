import { Button } from "@chakra-ui/react";

import EmptyState from "./EmptyState";

export default function DappsTab() {
  return (
    <EmptyState
      imageSrc="/static/empty_clock.svg"
      imageWidth="260px"
      title="Dapps will be available soon"
      description="Stay tuned for updates"
      contentAfter={
        <Button
          as="a"
          target="_blank"
          rel="noopener"
          href="https://airtable.com/appgCn5C5Z29KeAuP/shrCSDZaAAEqfdRZZ"
        >
          Notify me
        </Button>
      }
    />
  );
}
