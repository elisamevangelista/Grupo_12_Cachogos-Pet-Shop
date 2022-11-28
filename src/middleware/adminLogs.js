const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let adminlogs = (req, res, next) => {
    let { name } = req.query
    let admins = users.filter(ad => ad.tipodeusuario === 'admin')
    admins = admins.map(ad => ad.nombre)
    name = name?.toLowerCase()
    name = name.charAt(0).toUpperCase() + name.slice(1)

    if (typeof(name) !== 'string') throw new Error('el name no es un string')
    if (admins.indexOf(name) == -1) throw new Error('No tienes los privilegios para ingresar')
    next()
}

module.exports = adminlogs 
