package com.example.demo.service;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemService itemService;

    @Test
    void updateItem_updatesActiveField() {
        Item existing = new Item(1L, "old", "old desc", true);
        Item updateDetails = new Item();
        updateDetails.setName("new");
        updateDetails.setDescription("new desc");
        updateDetails.setActive(false);

        when(itemRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(itemRepository.save(any(Item.class))).thenAnswer(inv -> inv.getArgument(0));

        Item result = itemService.updateItem(1L, updateDetails);

        verify(itemRepository).save(existing);
        assertEquals("new", result.getName());
        assertEquals("new desc", result.getDescription());
        assertFalse(result.isActive());
    }
}
