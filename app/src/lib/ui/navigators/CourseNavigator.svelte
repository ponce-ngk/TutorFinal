<script lang="ts">
  import type { Course } from "$lib/services/models/course";
  import { TopicNavigator } from "$lib/ui/legacy";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

  export let course: Course;
</script>

<Accordion regionPanel="space-y-0.5">
  {#each course.topics as topic}
    <AccordionItem>
      <svelte:fragment slot="summary">{topic.lo.title}</svelte:fragment>
      <svelte:fragment slot="content">
        <TopicNavigator {topic} />
      </svelte:fragment>
    </AccordionItem>
  {/each}
</Accordion>
