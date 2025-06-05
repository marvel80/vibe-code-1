package com.example.demo.service;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration tests for the ItemService class.
 * 
 * This test class verifies the functionality of the ItemService, including:
 * - Item creation
 * - Item updates
 * - Active status management
 * 
 * The class uses:
 * - @SpringBootTest for full application context loading
 * - @Transactional to rollback database changes after each test
 * - H2 in-memory database for testing
 */
@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemRepository itemRepository;

    /**
     * Tests the creation of a new item.
     * 
     * Verifies that:
     * 1. The item is successfully persisted
     * 2. An ID is generated
     * 3. All fields are correctly stored
     * 4. The item count in the database is increased
     * 
     * Test data:
     * - Name: "Test Item"
     * - Description: "Item description"
     * - Active: true
     */
    @Test
    void testCreateItem() {
        Item item = new Item();
        item.setName("Test Item");
        item.setDescription("Item description");
        item.setActive(true);

        Item saved = itemService.createItem(item);

        assertNotNull(saved.getId());
        assertEquals("Test Item", saved.getName());
        assertEquals("Item description", saved.getDescription());
        assertTrue(saved.isActive());
        assertEquals(1, itemRepository.count());
    }

    /**
     * Tests the update functionality of an existing item.
     * 
     * Verifies that:
     * 1. All fields can be updated
     * 2. The active status is correctly modified
     * 3. The changes are persisted in the database
     * 4. The item ID remains unchanged
     * 
     * Test flow:
     * 1. Creates an initial item
     * 2. Updates all fields
     * 3. Verifies changes in memory
     * 4. Verifies changes in database
     * 
     * Field changes:
     * - Name: "Original" → "Updated"
     * - Description: "Original description" → "Updated description"
     * - Active: true → false
     */
    @Test
    void testUpdateItem() {
        // Create initial item
        Item item = new Item();
        item.setName("Original");
        item.setDescription("Original description");
        item.setActive(true);
        Item saved = itemService.createItem(item);

        // Prepare updates
        Item updates = new Item();
        updates.setName("Updated");
        updates.setDescription("Updated description");
        updates.setActive(false);

        // Perform update
        Item updated = itemService.updateItem(saved.getId(), updates);

        // Verify updates in memory
        assertEquals(saved.getId(), updated.getId());
        assertEquals("Updated", updated.getName());
        assertEquals("Updated description", updated.getDescription());
        assertFalse(updated.isActive());

        // Verify updates in database
        Item fromDb = itemService.getItem(saved.getId());
        assertFalse(fromDb.isActive());
    }
}
