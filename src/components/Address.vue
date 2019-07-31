<template>
    <div class="address">
        <span class="address-brand">{{ brand }}</span><br/>
        <span class="address-street">{{ street }}</span> <span class="address-number">{{ number }}</span><br/>
        <span class="address-postal-code">{{ postalCode }}</span> <span class="address-city">{{ city }}</span><br/>
        <span class="address-country">{{ country }}</span>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Address extends Vue
{
  brand = 'Ovenwand';
  street = 'Tweede Leeghwaterstraat';
  number = '1';
  postalCode = '1018RA';
  city = 'Amsterdam';
  country = 'The Netherlands';
}
</script>
