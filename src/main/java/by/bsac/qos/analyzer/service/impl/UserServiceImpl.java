/*
package by.bsac.qos.analyzer.service.impl;

import java.util.Date;

import by.bsac.qos.analyzer.model.User;
import by.bsac.qos.analyzer.respository.UserRepository;
import by.bsac.qos.analyzer.service.UserService;

public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getOne(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Unknown user has been requested"));
    }

    @Override
    public void createUser(String name, String surname, Date birth) {
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setBirth(birth);
        userRepository.save(user);
    }
}
*/
