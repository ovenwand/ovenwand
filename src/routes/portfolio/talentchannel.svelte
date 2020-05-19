<script>
    import { Col, Page, Row } from '@/core/components';
    import { action, fluid, BACK } from '@/store/header';
    import { background } from '@/store/page';

    action.set(BACK);
    fluid.set(false);
    background.set(null);
</script>

<Page title="TalentChannel">
    <Row fill>
        <Col align="center" justify="center">
            <span class="display-1 text-align-center">Under construction</span>
        </Col>
    </Row>
</Page>
