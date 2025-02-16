<template></template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

onMounted(async () => {
    const route = useRoute();
    const router = useRouter();
    const directLink = route.params.directLink;

    console.log("Fetching file for direct link:", directLink);

    try {
        const { data, error: fetchError } = await useFetch(`/api/get-file-by-link?directLink=${directLink}`);
        if (fetchError.value) {
            console.error("Fetch error:", fetchError.value);
            router.push({ name: 'custom-404' });
        } else if (data.value) {
            console.log("File path received:", data.value);
            // Trigger direct download
            const downloadUrl = `${window.location.origin}${data.value.replace(/\\/g, '/')}`;
            console.log("Redirecting to download URL:", downloadUrl);
            window.location.href = downloadUrl;
        } else {
            console.error("File not found for direct link:", directLink);
            router.push({ name: 'custom-404' });
        }
    } catch (err) {
        console.error("Error loading file:", err);
        router.push({ name: 'custom-404' });
    }
});

// Disable layout
definePageMeta({
    layout: 'empty'
})
</script>

<style scoped>
.container {
    margin-top: 50px;
}
</style>
