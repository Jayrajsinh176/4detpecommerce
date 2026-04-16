<?php

namespace App\Filament\Resources\ShoppeHelpdesks;

use App\Filament\Resources\ShoppeHelpdesks\Pages\EditShoppeHelpdesk;
use App\Filament\Resources\ShoppeHelpdesks\Pages\ListShoppeHelpdesks;
use App\Filament\Resources\ShoppeHelpdesks\Schemas\ShoppeHelpdeskForm;
use App\Filament\Resources\ShoppeHelpdesks\Tables\ShoppeHelpdesksTable;
use App\Models\Shoppee_Helpdesk; // ✅ FIXED
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ShoppeHelpdeskResource extends Resource
{
    protected static ?string $model = Shoppee_Helpdesk::class;

    // ✅ FIXED ICON
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $recordTitleAttribute = 'subject';

    // ✅ GROUP
   protected static string|UnitEnum|null $navigationGroup = 'Shoppe Panel';
    protected static ?string $navigationLabel = 'Helpdesk';
    protected static ?string $pluralLabel = 'Helpdesk';
protected static ?int $navigationSort = 4;
    public static function form(Schema $schema): Schema
    {
        return ShoppeHelpdeskForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ShoppeHelpdesksTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    // ✅ REMOVE CREATE PAGE
    public static function getPages(): array
    {
        return [
            'index' => ListShoppeHelpdesks::route('/'),
            'edit' => EditShoppeHelpdesk::route('/{record}/edit'),
        ];
    }
}