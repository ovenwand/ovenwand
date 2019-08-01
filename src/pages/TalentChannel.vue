<template>
    <Container id="content">
        <Row>
            <Col>
                TalentChannel
            </Col>
        </Row>
    </Container>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator';
import Page from '../mixins/Page';

@Component({
  page: {
    name: 'project-talentchannel',
    title: 'Project: TalentChannel',
    darkText: true,
    back: true,
  },
})
export default class TalentChannel extends Mixins(Page)
{
}
</script>
