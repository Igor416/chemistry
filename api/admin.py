from django.contrib import admin
from .models import Element, ElementCountInIon, ElementCountInCovalentSubstance, SimpleIon, ComplexIon, Klass, CovalentSubstance, IonicSubstance, Reaction

@admin.register(Element)
class ElementAdmin(admin.ModelAdmin):
    ordering = ('atomic_number',)
    list_filter = ('type', 'family', 'block')

class ElementCountInIonInline(admin.TabularInline):
    model = ElementCountInIon
    extra = 2

class ElementCountInCovalentSubstanceInline(admin.TabularInline):
    model = ElementCountInCovalentSubstance
    extra = 2

@admin.register(ComplexIon)
class ComplexIonAdmin(admin.ModelAdmin):
    inlines = (ElementCountInIonInline,)

@admin.register(Klass)
class KlassAdmin(admin.ModelAdmin):
    ordering = ('is_organic', 'name')
    list_filter = ('is_organic',)

@admin.register(CovalentSubstance)
class CovalentSubstanceAdmin(admin.ModelAdmin):
    inlines = (ElementCountInCovalentSubstanceInline,)

admin.site.register((SimpleIon, IonicSubstance, Reaction))