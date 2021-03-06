<?php
namespace Cms\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cms\Model\Entity\School;

/**
 * Schools Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsTo $Instituitions
 */
class SchoolsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('schools');
        $this->displayField('id');
        $this->primaryKey('id');
        $this->addBehavior('Timestamp');
        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER',
            'className' => 'Cms.Users'
        ]);
        $this->belongsTo('Instituitions', [
            'foreignKey' => 'instituition_id',
            'joinType' => 'INNER',
            'className' => 'Cms.Instituitions'
        ]);
    }
}
