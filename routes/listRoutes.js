const express = require('express');
const router = express.Router();
const { createChecklist,deleteChecklist,getAllChecklists,getChecklistDetail,updateChecklistItemStatus
    ,updateChecklistItem } = require('../controllers/listControllers');
const { authenticate } = require('../middlewares/auth');

// Create new Todo
router.post('/:todoId/item', createChecklist, authenticate);
router.delete('/:todoId/item/:checklistId',deleteChecklist, authenticate);
router.get('/:todoId/item',getAllChecklists, authenticate);
router.get('/:todoId/item/:checklistId',getChecklistDetail, authenticate);
router.put('/:todoId/item/:checklistId',updateChecklistItemStatus,authenticate);
router.put('/:todoId/item/rename/:checklistId',updateChecklistItem,authenticate);

module.exports = router;