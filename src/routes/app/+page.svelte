<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>

<h1>Hi, {data.user.username}!</h1>
<p>Your user ID is {data.user.id}.</p>
<a href="/logout">Sign Out</a>