<script>
    import { name } from '@/store/brand';

    const currentYear = (new Date()).getFullYear();
</script>

<style lang="sass">
    footer {
        padding: 1.2rem;
        pointer-events: none;

    span {
            font-size: 2rem;
            transition: color .2s ease;
            pointer-events: all;
        }
    }
</style>

<footer id="app-footer" class="text-align-center">
    <span>&copy; {$name} {currentYear}</span>
</footer>