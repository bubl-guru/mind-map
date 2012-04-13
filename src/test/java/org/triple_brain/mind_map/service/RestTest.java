    package org.triple_brain.mind_map.service;

import com.google.inject.Binder;
import com.google.inject.Module;
import com.google.inject.Stage;
import com.google.inject.util.Modules;
import com.mycila.inject.jsr250.Jsr250;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.client.apache.config.DefaultApacheHttpClientConfig;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.triple_brain.mind_map.Launcher;
import org.triple_brain.module.model.User;
import org.triple_brain.module.repository.user.user.UserRepository;
import org.triple_brain.module.repository_sql.SQLModule;
import org.triple_brain.module.repository_sql.SQLUserRepository;

import javax.inject.Inject;
import javax.ws.rs.core.NewCookie;
import java.net.URI;
import java.sql.SQLException;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.triple_brain.module.repository_sql.SQLConnection.*;


    /**
 * Copyright Mozilla Public License 1.1
 */
public abstract class RestTest implements Module {

   protected static URI BASE_URI;
   protected WebResource resource;
   protected ClientResponse response;
   static private Launcher launcher;
   static private Client client;
   protected NewCookie authCookie;

    @Inject
    UserRepository userRepository;


    @BeforeClass
    static public void startServer() throws Exception {
        BASE_URI = new URI("http://localhost:8080/service");
        
        launcher = new Launcher();
        launcher.launch();

        DefaultApacheHttpClientConfig clientConfig = new DefaultApacheHttpClientConfig();
        clientConfig.getProperties().put("com.sun.jersey.impl.client.httpclient.handleCookies", true);
        client = Client.create(clientConfig);
        cleanTables();
    }

    @AfterClass
    static public void stopServer() throws Exception {
        launcher.stop();
    }

    @Before
    public void before_rest_test()throws SQLException{
        Jsr250.createInjector(Stage.PRODUCTION, Modules.override(new SQLModule()).with(this)).injectMembers(this);
        cleanTables();
        resource = client.resource(BASE_URI);
    }

    @After
    public void after_rest_test()throws SQLException{
        closeConnection();
    }

    static protected void cleanTables()throws SQLException {
        clearDatabases();
        createTables();
    }



    @Override
    public final void configure(Binder binder) {
        binder.bind(UserRepository.class).to(SQLUserRepository.class);
    }

    protected void authenticate(){
        authenticate(
                createAUser()
        );
    }

    protected User createAUser(){
        User user = User.withUsernameAndEmail("a_user_name", "user@triplebrain.org").password("password");
        userRepository.save(user);
        return user;
    }

    protected void authenticate(User user) {
        response = resource.path("users").path("authenticate").queryParam("email", user.email()).queryParam("password", "password").cookie(authCookie).get(ClientResponse.class);
        assertThat(response.getStatus(), is(200));
        authCookie = response.getCookies().get(0);
    }

}