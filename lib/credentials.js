var mongo = {
    dev: { 
        connectionString: 'http://localhost:40' 
    },
    prod: { 
        connectionString: 'prod_connection_string' 
    },
}

exports.getConnectionString = function(env) {
    if (env in Array('dev', 'prod')) {
        return mongo[env]['connectionString'];
    }
};
