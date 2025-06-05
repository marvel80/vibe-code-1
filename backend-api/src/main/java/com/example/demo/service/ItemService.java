package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItem(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item updateItem(Long id, Item itemDetails) {
        Item item = getItem(id);
        item.setName(itemDetails.getName());
        item.setDescription(itemDetails.getDescription());
        item.setActive(itemDetails.isActive());
        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        Item item = getItem(id);
        itemRepository.delete(item);
    }

    public List<Item> searchByName(String name) {
        return itemRepository.findByNameContainingIgnoreCase(name);
    }
} 