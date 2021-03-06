<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit Therapist'), ['action' => 'edit', $therapist->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Therapist'), ['action' => 'delete', $therapist->id], ['confirm' => __('Are you sure you want to delete # {0}?', $therapist->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Therapists'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Therapist'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New User'), ['controller' => 'Users', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="therapists view large-10 medium-9 columns">
    <h2><?= h($therapist->id) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('User') ?></h6>
            <p><?= $therapist->has('user') ? $this->Html->link($therapist->user->id, ['controller' => 'Users', 'action' => 'edit', $therapist->user->id]) : '' ?></p>
            <h6 class="subheader"><?= __('Username') ?></h6>
            <p><?= h($therapist->username) ?></p>
            <h6 class="subheader"><?= __('Password') ?></h6>
            <p><?= h($therapist->password) ?></p>
            <h6 class="subheader"><?= __('Full Name') ?></h6>
            <p><?= h($therapist->full_name) ?></p>
            <h6 class="subheader"><?= __('Phone') ?></h6>
            <p><?= h($therapist->phone) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($therapist->id) ?></p>
        </div>
        <div class="large-2 columns dates end">
            <h6 class="subheader"><?= __('Created') ?></h6>
            <p><?= h($therapist->created) ?></p>
            <h6 class="subheader"><?= __('Modified') ?></h6>
            <p><?= h($therapist->modified) ?></p>
        </div>
    </div>
    <div class="row texts">
        <div class="columns large-9">
            <h6 class="subheader"><?= __('Role') ?></h6>
            <?= $this->Text->autoParagraph(h($therapist->role)) ?>
        </div>
    </div>
</div>
