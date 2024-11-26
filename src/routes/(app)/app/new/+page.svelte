<script>
	import { enhance } from '$app/forms';

    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>

<form method="post" action="?/create" use:enhance>
	<label>
		Name
		<input name="name" />
	</label>
	<button>Create</button>
	<button formaction="?/register">Register</button>
</form>