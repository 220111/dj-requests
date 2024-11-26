<script>
	import { enhance } from '$app/forms';
	import { Label, Input, Button, Checkbox } from 'flowbite-svelte';
	import { Register, Section } from 'flowbite-svelte-blocks';
	let { form } = $props();
</script>

<!-- <h1>Login/Register</h1>
<form method="post" action="?/login" use:enhance>
	<Label>
		Username
		<Input name="username" />
	</Label>
	<Label>
		Password
		<Input type="password" name="password" />
	</Label>
	<Button>Login</Button>
	<Button formaction="?/register">Register</Button>
</form> -->

<Section name="login">
	<Register href="/">
	  <svelte:fragment slot="top">
		<img class="w-8 h-8 mr-2" src="/images/logo.svg" alt="logo" />
		DJ Requests
	  </svelte:fragment>
	  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<p style="color: red">{form?.message ?? ''}</p>
		<form class="flex flex-col space-y-6" method="post" action="?/login" use:enhance>
		  <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Change Password</h3>
		  <Label class="space-y-2">
			<span>Username</span>
			<Input name="username" placeholder="johnsmith123" required />
		  </Label>
		  <Label class="space-y-2">
			<span>Password</span>
			<Input type="password" name="password" placeholder="•••••" required />
		  </Label>
		  <Button type="submit" class="w-full1">Sign in</Button>
		  <Button formaction="?/register">Register</Button>
		</form>
	  </div>
	</Register>
  </Section>