<script>
    import { name } from '@/store/brand';

    const currentYear = (new Date()).getFullYear();
</script>

<style lang="scss">
    @import "Footer";
</style>

<footer id="app-footer" class="text-align-center">
    <span>&copy; {$name} {currentYear}</span>
</footer>