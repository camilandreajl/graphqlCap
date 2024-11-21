
// si tengo un query bajo el tipo query , el resolver tambien deb eestar dentro d euntipo QUery
// y me tiene que retornar exactamente el tipo que puse en  el schema ejm [User]
// cualquier campo del modelo que yo no retorne será devuelto como null

// type Query {
//     users:[User]
//     user(email:String!): User 
//     role(name:String): Role
// }

const roles = [
    {id: 'id1', name: 'admin'},
    {id: 'id2', name: 'user'},
    {id: 'id3', name: 'manager'},
]

const  users = [

    {   id: '1',
        name: 'John', 
        email: 'test@email.com', 
        roleId: 'id1'
    },
    {
        id: '2',
    name: 'John2', 
     email: 'test1@email.com',  
     roleId: 'id2',},

    { id: '3',
        name: 'John3', 
    email: 'test3@email.com', 
    roleId: 'id3'
}
]

const userResolvers = {
//puedo hacer resolvers para los otros tipos de ls DB que no sean Query o Mutation para hacer trasnformaciones 
//requeridas por ejm 
    User:{
        name: (parent, args, context) => {
            // parent: respuesta de la consulta ti´p QUERY que estoy haciendo
            // args: argumntos que estoy pasando al hacer la consulta ejm un ID o un email
            // context: es un objeto que puedo pasar a todos los resolvers , por ejm la session de user y la DB 
            return parent.name.toUpperCase()
        },
        role: (parent, args, context) => {
            return roles.find(el => el.id === parent.roleId)
        },
    },
    Role: {
        users: (parent, args, context) => {
            console.log('parent :>> ', parent);
            return users.filter((user) => user.roleId === parent.id)
        }
    },
    Query:{
        users: () => {
            return users
        },
        user: (parent, args, context) => {
            console.log('args :>> ', args);
            return users.find((us) => us.email === args.email)
        },
        roles: () => {
            return roles
        }
    }
};

export {userResolvers}