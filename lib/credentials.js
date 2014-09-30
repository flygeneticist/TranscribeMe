var mongo = {
    dev: { 
        connectionString: 'dev_connection_string' 
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
