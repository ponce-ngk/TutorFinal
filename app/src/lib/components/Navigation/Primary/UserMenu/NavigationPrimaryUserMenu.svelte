<script lang="ts">
  import Icon from "@iconify/svelte";

  export let isNotCourseRoute: boolean = false;
  export let name: string = "";
  export let username: string = "";
  export let userId: string = "";
  export let onlineStatus: boolean | undefined = undefined;
  export let usersOnline: string = "";
  export let currentCourseId: string = "";
  export let currentCourseUrl: string = "";
  export let handleClick: () => void;
  export let handleSignOut: () => void;
  export let onlineDrawerOpen: () => void;
</script>

<nav class="list-nav card card-body w-56 p-4 space-y-4 shadow-lg" data-popup="avatar">
  <span class="mt-2 ml-4 text-xs">Logged in as:</span><br />
  <span class="ml-4 text-sm">{name}</span>
  <ul>
    <li>
      <a href="/dashboard">
        <Icon icon="fluent:home-24-filled" color="rgba(var(--color-primary-500))" height="20" />
        <div class="ml-2">Dashboard</div>
      </a>
    </li>
    {#if !isNotCourseRoute}
      <hr />
      <li class="flex">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a on:click={handleClick}>
          {#if onlineStatus}
            <Icon
              icon="fluent:presence-available-24-filled"
              color="rgba(var(--color-success-500))"
              height="20"
            />
          {/if}
          {#if !onlineStatus}
            <Icon
              icon="fluent:presence-available-24-regular"
              color="rgba(var(--color-error-500))"
              height="20"
            />
          {/if}
          <div class="ml-2">Share Presence</div>
        </a>
      </li>
      {#if onlineStatus}
        <li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a on:click={onlineDrawerOpen}>
            <Icon
              icon="fluent:people-list-24-filled"
              color="rgba(var(--color-primary-500))"
              height="20"
            />
            <div class="ml-2">
              View <span class="badge bg-error-500 text-white">{usersOnline}</span> Online
            </div>
          </a>
        </li>
      {/if}
      <hr />
      {#if onlineStatus}
        <li>
          <a href="/live/{currentCourseId}" target="_blank" rel="noreferrer">
            <Icon
              icon="fluent:people-list-24-filled"
              color="rgba(var(--color-primary-500))"
              height="20"
            />
            <div class="ml-2">Tutors Live</div>
          </a>
        </li>
      {/if}
      <li>
        <a href="/time/{currentCourseUrl}/{userId}" target="_blank" rel="noreferrer">
          <Icon
            icon="fluent:clock-alarm-24-filled"
            color="rgba(var(--color-primary-500))"
            height="20"
          />
          <div class="ml-2">Tutors Time</div>
        </a>
      </li>
      <hr />
    {/if}
    <li>
      <a href="https://github.com/{username}" target="_blank" rel="noreferrer">
        <Icon icon="mdi:github" height="20" />
        <div class="ml-2">Github Profile</div>
      </a>
    </li>
    <li>
      <button on:click={handleSignOut} class="w-full">
        <Icon icon="fluent:sign-out-24-filled" color="rgba(var(--color-error-500))" height="20" />
        <div class="ml-2">Logout</div>
      </button>
    </li>
  </ul>
</nav>
