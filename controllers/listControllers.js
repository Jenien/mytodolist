const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create new checklist
const createChecklist = async (req, res) => {
    const { itemName } = req.body;  
    const { todoId } = req.params; 
    try {
        // Check if Todo exists
        const todo = await prisma.todo.findUnique({
            where: { todoId: parseInt(todoId, 10) }  
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Create checklist associated with the todo
        const checklist = await prisma.checklist.create({
            data: {
                itemName,
                todoId: parseInt(todoId, 10),
            },
        });
        res.status(201).json(checklist);
    } catch (error) {
        console.error('Error creating checklist:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


// Get all checklists for a specific Todo
const getAllChecklists = async (req, res) => {
  const { todoId } = req.params; // Get todoId from the URL parameters

  try {
    const checklists = await prisma.checklist.findMany({
      where: { todoId: parseInt(todoId) } 
    });
    res.status(200).json(checklists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get checklist by id
const getChecklistDetail = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const checklist = await prisma.checklist.findUnique({
      where: { checklistId: parseInt(checklistId) }
    });

    if (!checklist) return res.status(404).json({ error: "Checklist not found" });

    res.status(200).json(checklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateChecklistItem = async (req, res) => {
  const { checklistId } = req.params; 
  const { itemName } = req.body; 

  try {

      const currentItem = await prisma.checklist.findUnique({
          where: { checklistId: parseInt(checklistId) },
      });

      if (!currentItem) {
          return res.status(404).json({ message: 'Checklist item not found' });
      }

      // Update only the fields that are provided
      const updatedItem = await prisma.checklist.update({
          where: { checklistId: parseInt(checklistId) },
          data: {
              itemName: itemName !== undefined ? itemName : currentItem.itemName, 
          },
      });

      res.status(200).json({
          message: 'Checklist item updated successfully',
          updatedItem,
      });
  } catch (error) {
      console.error('Error updating checklist item:', error);
      res.status(500).json({ error: error.message });
  }
};

// Update status of item (mark as checked/unchecked)
const updateChecklistItemStatus = async (req, res) => {
  const { checklistId, todoId } = req.params;

  try {
      const checklistItem = await prisma.checklist.findUnique({
          where: { checklistId: parseInt(checklistId) }
      });

      if (!checklistItem) {
          return res.status(404).json({ message: 'Checklist item not found' });
      }

      // Check if the checklist item is associated with the provided todoId
      if (checklistItem.todoId !== parseInt(todoId)) {
          return res.status(403).json({ message: 'Todo ID does not match the checklist item' });
      }

      // Toggle the isChecked status
      const updatedItem = await prisma.checklist.update({
          where: { checklistId: parseInt(checklistId) },
          data: {
              isChecked: !checklistItem.isChecked  
          },
      });

      res.status(200).json({
          message: `Checklist item with ID ${updatedItem.checklistId} updated successfully`,
          updatedItem: {
              checklistId: updatedItem.checklistId,
              itemName: updatedItem.itemName,
              isChecked: updatedItem.isChecked,
              createdAt: updatedItem.createdAt,
              updatedAt: updatedItem.updatedAt,
          },
      });
  } catch (error) {
      console.error('Error updating checklist item status:', error);
      res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete item by checklist item ID
const deleteChecklist = async (req, res) => {
  const { todoId, checklistId } = req.params;

  try {
      
      const checklist = await prisma.checklist.findUnique({
          where: { checklistId: parseInt(checklistId) },
      });

      if (!checklist) {
          return res.status(404).json({ message: 'Checklist not found' });
      }

      if (checklist.todoId !== parseInt(todoId)) {
          return res.status(403).json({ message: 'This checklist does not belong to the specified todo' });
      }

      // Proceed to delete the checklist
      const deletedChecklist = await prisma.checklist.delete({
          where: { checklistId: parseInt(checklistId) },
      });

      res.status(200).json({
          message: `Checklist with ID ${deletedChecklist.checklistId} deleted successfully`,
          deletedChecklist: {
              checklistId: deletedChecklist.checklistId,
              itemName: deletedChecklist.itemName,
              createdAt: deletedChecklist.createdAt,
              updatedAt: deletedChecklist.updatedAt,
          },
      });
  } catch (error) {
      console.error('Error deleting checklist:', error);
      res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createChecklist,
  deleteChecklist,
  getAllChecklists,
  getChecklistDetail,
  updateChecklistItemStatus,
  updateChecklistItem

};
