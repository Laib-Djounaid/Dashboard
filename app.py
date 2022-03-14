from flask import Flask , render_template , request , redirect, jsonify
from werkzeug.utils import redirect
import json 
from flaskext.mysql import MySQL
import random

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] = 'db_university'

mysql.init_app(app)

@app.route('/')
def index():
    return render_template('dashboard.html') 


@app.route('/api/data1')
def getData1():
    data = {"years":[], "nbr":[]}
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT annee from resultats")
    annees = []
    for x in cursor.fetchall():
        annees.append(x[0])
        pass
    data['years']=annees
    moy= []

    for a in annees :
        cursor.execute("select moyenne from resultats where annee="+str(a))
        for x in cursor.fetchall():
            moy.append(x[0])
        pass
        
        data['nbr'].append(sum(moy)/len(moy))
    
   
    conn.commit()
    cursor.close()
    return jsonify(data)


@app.route('/api/data2')
def getData2():

    data = { "specialite" : [] , 'datasets' : [] }
    conn=mysql.connect()
    cursor = conn.cursor()

    #sp= "SPECIALITE_1"

    cursor.execute("SELECT DISTINCT annee  from resultats")
    annees = []
    for x in cursor.fetchall():
        annees.append(x[0])

    #data["years"]=annees


    cursor.execute("SELECT DISTINCT specialite  from resultats")
    specialites = []
    for x in cursor.fetchall():
        specialites.append(x[0])
    
    data["specialite"]=specialites

    #annees=[2019]
    #specialites=['SPECIALITE_1']
    etu = [] # nbr_etu_chaque_annee
    for a in annees :
        x= {}
        for s in specialites :
            cursor.execute("select count(*) from resultats where annee="+str(a)+" and specialite = '"+str(s)+"' ")
            etu.append(cursor.fetchall()[0][0])
        x["data"] = etu
        x["label"]=a
        
        data["datasets"].append(x)
        etu = []
        
    #print(data)
        #print("en "+str(a)+" Il y avait "+str(cursor.fetchall()[0][0])+" etudiants")
    #print(data)

    conn.commit()
    cursor.close()
    return jsonify(data)


@app.route('/api/data3')
def getData3():
    
    data = {"years":[], 'datasets': []}
    
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT annee from resultats")
    annees = []
    for x in cursor.fetchall():
        annees.append(x[0])
        pass
    data['years']=annees
    

    for a in annees :
        
        cursor.execute("select count(*) from resultats where annee="+str(a))
        x=cursor.fetchall()[0][0]
        data['datasets'].append(x)
        

    print(data)
    conn.commit()
    cursor.close()
    return jsonify(data)


@app.route('/api/data4')
def getData4():
    data = {"years":[], "moyennes" : [] }
    sexe= ['H' , 'F']
    conn=mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT annee  from resultats")
    annees = []
    for x in cursor.fetchall():
        annees.append(x[0])

    data["years"]=annees
    etu = []
    for s in sexe :
        x= {}
        for a in annees :
            cursor.execute("select count(*) from resultats where annee = "+str(a)+" and sexe='"+str(s)+"' and moyenne >= 10")
            etu.append(cursor.fetchall()[0][0])
            
        x['label']= s
        x['data'] = etu

        data["moyennes"].append(x)
        etu = []

    #print(data)
    
    conn.commit()
    cursor.close()
    return jsonify(data)


if __name__ == '__main__':
	app.run(debug=True, port=5000)