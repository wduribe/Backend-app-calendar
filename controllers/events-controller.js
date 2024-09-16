const Events = require('../models/events-model.js');


const getEvents = async (req, res) => {
    try {
        const events = await Events.find().populate('user', 'name');
        return res.json({
            ok: true,
            events
        });
    } catch (error){
        return res.status( 500 ).json({
            ok: false,
            message: 'Ups... one error has ocurred',
        })
    }
}


const createEvent = async (req, res) => {
    const events = new Events(req.body);
    try {

        events.user = req.uid;
        await events.save();

        res.status(200).json({
            ok: true,
            event: events,
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: 'Ups... one error has ocurred'
        })
    }
}

const updateEvent = async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                messague: 'This id doesn´t exist',
            });
        };
        //Validando que sea el mismo usuario que crea el evento, el que lo edite

        if (uid !== event.user.toString()) {
            return res.status(401).json({
                ok: false,
                message: 'Unauthorized action'
            });
        };
        const infoEvent = {
            ...req.body,
            user: uid
        };
        const eventUpdated = await Events.findByIdAndUpdate(eventId, infoEvent, { new: true });
        return res.json({
            ok: true,
            event: eventUpdated,
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Ups... one error has ocurred'
        })
    }
}
const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {

        const event = await Events.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'This id doesn´t exist'
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(404).json({
                ok: false,
                message: 'Unauthorized action'
            });
        }

        await Events.findByIdAndDelete(eventId);

        res.json({
            ok: true,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Ups... one error has ocurred',
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}