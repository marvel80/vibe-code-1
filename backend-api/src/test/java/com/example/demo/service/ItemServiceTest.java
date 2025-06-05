package com.example.demo.service;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemRepository itemRepository;

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

    @Test
    void testUpdateItem() {
        Item item = new Item();
        item.setName("Original");
        item.setDescription("Original description");
        item.setActive(true);
        Item saved = itemService.createItem(item);

        Item updates = new Item();
        updates.setName("Updated");
        updates.setDescription("Updated description");
        updates.setActive(false);

        Item updated = itemService.updateItem(saved.getId(), updates);

        assertEquals(saved.getId(), updated.getId());
        assertEquals("Updated", updated.getName());
        assertEquals("Updated description", updated.getDescription());
        assertFalse(updated.isActive());

        Item fromDb = itemService.getItem(saved.getId());
        assertFalse(fromDb.isActive());
    }
}
