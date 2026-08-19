from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
from .models import SearchHistory
from django.contrib.auth import get_user_model

@csrf_exempt
def check_news(request):
    if request.method != 'POST':
        return JsonResponse({'ok':False,'error':'POST only'}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
    except:
        return JsonResponse({'ok':False,'error':'invalid json'}, status=400)
    # Mock response - in future replace with ML/check APIs
    url = data.get('url','')
    headline = data.get('headline','(no headline)')
    resp = {
        'ok': True,
        'credibility': 82.5,
        'verdict': 'VERIFIED TRUE',
        'category': 'Politics',
        'summary': 'Mock summary: '+headline[:120],
        'domain': data.get('domain','unknown'),
    }
    return JsonResponse(resp)

@csrf_exempt
def save_history(request):
    if request.method != 'POST':
        return JsonResponse({'ok':False,'error':'POST only'}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
    except:
        return JsonResponse({'ok':False,'error':'invalid json'}, status=400)
    # If user is authenticated via session cookie, save
    user = None
    if request.user.is_authenticated:
        user = request.user
    else:
        # try to find by username if provided (not secure, just demo)
        uname = data.get('username')
        if uname:
            User = get_user_model()
            try:
                user = User.objects.get(username=uname)
            except:
                user = None
    if user:
        sh = SearchHistory.objects.create(
            user=user,
            url=data.get('url',''),
            domain=data.get('domain',''),
            headline=data.get('headline',''),
            category=data.get('category',''),
            credibility=data.get('credibility'),
            summary=data.get('summary',''),
            flags=data.get('flags',[])
        )
        return JsonResponse({'ok':True,'id':sh.id})
    else:
        return JsonResponse({'ok':False,'error':'not authenticated'}, status=401)

@csrf_exempt
def get_history(request):
    if not request.user.is_authenticated:
        return JsonResponse({'ok':False,'error':'not authenticated'}, status=401)
    items = SearchHistory.objects.filter(user=request.user)[:50]
    out = []
    for it in items:
        out.append({
            'id': it.id, 'url': it.url, 'headline': it.headline, 'credibility': it.credibility,
            'summary': it.summary, 'created_at': it.created_at.isoformat()
        })
    return JsonResponse({'ok':True,'items':out})

urlpatterns = [ path('check-news/', check_news), path('history/save/', save_history), path('history/get/', get_history) ]