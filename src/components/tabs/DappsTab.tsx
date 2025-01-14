import { Button } from "@chakra-ui/react";

import EmptyState from "~/components/shared/EmptyState";

export default function DappsTab() {
  return (
    <EmptyState
      image={{
        src: "/static/empty_clock.svg",
        width: 266,
        height: 210,
      }}
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
