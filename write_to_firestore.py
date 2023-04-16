import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore import GeoPoint

login = credentials.Certificate("./serviceAccountKey.json")

# initialize firebase
firebase_admin.initialize_app(login)

db = firestore.client()

collection_earthquake = db.collection("earthquake")
collection_electricity = db.collection("electricity")
collection_reservoir = db.collection("reservoir")


# read from firestore
'''
for data in collection_earthquake:
    # print("{}".format(data.to_dict()))

for doc in collection_earthquake_s:
    print(str(doc.to_dict()["epicenter"].latitude))
    print(str(doc.to_dict()["epicenter"].longitude))
'''

# write to firestore

# earthquake

# input type: float


def set_epicenter(latitude, longitude):
    location = GeoPoint(latitude, longitude)
    collection_earthquake.document('last').update({
        'epicenter': location,
    })

# input type: float or int


def set_PGA_PGV(PGA, PGV):
    collection_earthquake.document('last').update({
        'PGA': float(PGA),
        'PGV': float(PGV)
    })

# input type: string, example:  "2023/4/16 12:30"


def set_date_e(date):
    collection_earthquake.document('last').update({
        'date': str(date)
    })


# input type: dictionary, as below
'''
dic = {
    'Locations': {
        'middle': {'PGA': 0, 'PGV': 0},
        'north': {'PGA': 0, 'PGV': 0},
        'south': {'PGA': 0, 'PGV': 0}
    }
}
'''


def set_each_location(dic):
    collection_earthquake.document('last').update(dic)


# reservoir
# need to encode the name of each reservoir into ID

# input type: dictionary, as below
'''
dic = {
    'Amount': {
        'reservoir_1': 0,
        'reservoir_2': 0,
        'reservoir_3': 0,
        'reservoir_4': 0,
        'reservoir_5': 0,
        'reservoir_6': 0,
        'reservoir_7': 0,
        'reservoir_8': 0
    }
}
'''


def set_amount(dic):
    collection_reservoir.document('last').update(dic)


# input type: dictionary, as below
'''
dic = {
    'Percentage': {
        'reservoir_1': 0,
        'reservoir_2': 0,
        'reservoir_3': 0,
        'reservoir_4': 0,
        'reservoir_5': 0,
        'reservoir_6': 0,
        'reservoir_7': 0,
        'reservoir_8': 0
    }
}
'''


def set_percentage(dic):
    collection_reservoir.document('last').update(dic)

# input type: string, example:  "2023/4/16 12:30"


def set_date_r(date):
    collection_reservoir.document('last').update({
        'date': str(date)
    })
