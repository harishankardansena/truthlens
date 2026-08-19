from django.db import models
from django.conf import settings
class SearchHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='search_history')
    url = models.URLField(max_length=2000)
    domain = models.CharField(max_length=255, blank=True)
    headline = models.TextField(blank=True)
    category = models.CharField(max_length=64, blank=True)
    credibility = models.FloatField(null=True, blank=True)
    summary = models.TextField(blank=True)
    flags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_at']