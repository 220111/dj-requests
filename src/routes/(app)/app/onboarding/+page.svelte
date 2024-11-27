<script>
	import { enhance } from '$app/forms';
	import { Button, Input, Label, P, StepIndicator } from 'flowbite-svelte';
	import { Register, Section } from 'flowbite-svelte-blocks';

	/** @type {{ data: import('./$types').PageData; form: import('./$types').ActionData}} */
	let { data, form } = $props();

	// let currentStep = $derived(data.step);
	let steps = ['Create Account', 'Create Act', 'Create Event'];
</script>

<Section name="login">
	<Register href="/">
		<svelte:fragment slot="top">
			<img class="mr-2 h-8 w-8" src="/images/logo.svg" alt="logo" />
			DJ Requests
		</svelte:fragment>
		<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
			<h1 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Onboading</h1>
			<StepIndicator currentStep={data.step} {steps} glow />
			{#if form !== null }
				<p style="color: red">{form?.message ?? ''}</p>
			{/if}
			{#if data.step == 1}
				<form method="post" action="?/register" use:enhance>
					<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div class="sm:col-span-2">
							<Label class="mb-2" for="username">Username</Label>
							<Input type="text" placeholder="JohnSmith123" name="username" id="username" required />
						</div>
						<div class="sm:col-span-2">
							<Label class="mb-2" for="password">Password</Label>
							<Input type="password" placeholder="********" name="password" id="password" required />
						</div>
						<Button type="submit">Register</Button>
					</div>
				</form>
			{/if}

			{#if data.step == 2}
				<P class="text-s mb-4">
					Acts represent how event hosts and guests will see you. You'll need at least one to start
					taking request but you can also create multiple later to differentiate your club and
					wedding acts.
				</P>

				<form method="post" action="?/create" use:enhance>
					<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div class="sm:col-span-2">
							<Label class="mb-2" for="name">Name</Label>
							<Input type="text" placeholder="DJ Henry" name="name" id="name" required />
						</div>
						<Button type="submit">Create</Button>
					</div>
				</form>
			{/if}
		</div>
	</Register>
</Section>
