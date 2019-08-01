<template>
    <div class="footer">
        <span>&copy; {{ brand }} {{ year }}</span>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue
{
  brand = 'Ovenwand';

  get year() {
    return 2019;
  }
}
</script>

<style lang="scss">
    .footer {
        bottom: 0;
        left: 0;
        padding: 12px;
        position: absolute;
        right: 0;
        text-align: center;

        span {
            font-size: 20px;
            transition: color .2s ease;
        }
    }
</style>
